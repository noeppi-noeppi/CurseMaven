import { RequestHandler } from "express";
import { fetchDownloadUrl, getRedirectUrl } from "./util";

const normaljar: RequestHandler = async (req, res, classifierjar) => {
  const { id, file, classifier } = req.params

  if (classifier !== "") {
    return classifierjar()
  }

  const response = await fetchDownloadUrl(id, file)
  if (response.ok) {
    return res.redirect(getRedirectUrl(await response.text()))
  } else {
    return res.status(response.status).send(response.statusText)
  }
}

export default normaljar