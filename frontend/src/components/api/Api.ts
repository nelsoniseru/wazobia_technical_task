
export class Api {
  static async postReq(data: any) {

    let res = await fetch("https://wazproj.vercel.app/upload", {
      method: "post",
      body: data

    })
    const d = await res.json();
    return d
  }

}








