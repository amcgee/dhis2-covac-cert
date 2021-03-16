import path from "path";
import { createWriteStream, createReadStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import { divocPayloadFromTEI } from "../utils/dhis2divocMapping";

const streamPipeline = promisify(pipeline);

import { certify, getCertificateStream } from "../connectors/divoc";
import {
  addCertificateEvent,
  getTrackedEntityInstance,
} from "../connectors/dhis2";

const handler = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    console.error(`Bad request`, req.body);
    res.status(400).send("Bad request");
    return;
  }
  try {
    const tei: TrackedEntityInstance = await getTrackedEntityInstance(id);
    console.log(divocPayloadFromTEI(tei));

    await certify(id, divocPayloadFromTEI(tei));
    const fileStream = await getCertificateStream(id);
    // await streamPipeline(
    //   fileStream,
    //   createWriteStream(path.join(process.cwd(), "./certificate.pdf"))
    // );

    // const fileStream = createReadStream(path.join(process.cwd(), "./certificate.pdf"));

    await addCertificateEvent(tei, fileStream);

    res.end("Success!!");
  } catch (e) {
    console.error(e);
    res.status(500).send("Failed");
  }
};

export default handler;
