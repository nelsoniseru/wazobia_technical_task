import express from 'express'
import path from 'path'
import cors from 'cors'
import multer from 'multer'
class ExpressConfig {
  private app: any;
  constructor(app: any) {
    this.app = app;
  }

  setConfig() {
    this.app.use(express.json())
    this.app.use(express.static(path.join(__dirname, '../../src')));
    this.app.use(cors())
    this.app.use(express.urlencoded({ extended: false }));



  }

}
export default ExpressConfig;