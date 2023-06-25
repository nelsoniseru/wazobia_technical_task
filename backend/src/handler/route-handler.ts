import { Request, Response, NextFunction } from "express"
import multer from 'multer'
import path from 'path'
import * as CONSTANTS from '../config/constants'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.diskStorage({
  filename: function (req: Request, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  },
});

const upload = multer({
  storage: storage,

  fileFilter: function (req: Request, file, cb) {
    var ext = path.extname(file.originalname);
    if (
      ext !== ".png" && ext !== ".jpeg" && ext !== '.jpg'

    ) {

      return cb(null, false)
    }
    return cb(null, true)
  },
}).single('file')




class RouteHandler {
  async getIndexRouteHandler(request: Request, response: Response, next: NextFunction) {

    try {
      response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
        error: false,
        message: "welcome home boss",
      });
    } catch (error) {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.SERVER_ERROR_MESSAGE,
      });
    }


  }

  async getUploadfileRouteHandler(request: Request, response: Response, next: NextFunction) {
    try {


      upload(request, response, err => {
        if (err) {
          console.log(err)
          return response.json({ success: false, err })
        }
        console.log(request.file)
        if (request.file) {
          cloudinary.uploader.upload(request.file.path, (error, result) => {
            if (error) {
              console.error(error);
            } else {
              if (result) {
                return response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                  error: false,
                  message: "successful",
                  data: result.url,
                });
              }
            }
          })

        }



      })

    } catch (error) {
      console.log(error)
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.SERVER_ERROR_MESSAGE,
      });
    }
  }

  routeNotFoundHandler(request: Request, response: Response, next: NextFunction) {
    response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
      error: true,
      message: CONSTANTS.ROUTE_NOT_FOUND,
    });
  }
}


export default RouteHandler;
