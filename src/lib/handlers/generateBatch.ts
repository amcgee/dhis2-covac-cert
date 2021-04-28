import { parseDateString } from "../utils/dates";

const doGenerateBatch = async ({ start, end }) => {
  // TODO: batch generation

  return {
    count: 0,
    remainder: 0,
  };
};

export const generateBatch = async (req, res) => {
  const start = parseDateString(req.body.startDate);
  const end = req.body.endDate ? parseDateString(req.body.endDate) : new Date();

  if (!start || isNaN(start.getTime()) || !end || isNaN(end.getTime())) {
    console.error(`Bad request`, req.body);
    res.status(400).send("Bad request");
    return;
  }
  try {
    const { count, remainder } = await doGenerateBatch({ start, end });

    res
      .status(200)
      .send(
        `Successfully generated ${count} certificates, ${remainder} pending (start ${start} / end ${end})`
      );
  } catch (e) {
    console.error(String(e));
    res.status(500).send(`Failed batch generation (starting ${start})`);
  }
};

let intervalDelay;
let interval;

export const setSchedule = (req, res) => {
  clearInterval(interval);

  intervalDelay = parseInt(req.body.delay);

  if (!intervalDelay || isNaN(intervalDelay)) {
    res
      .status(400)
      .send(`Missing or invalid delay parameter for schedule setup`);
    return;
  }
  interval = setInterval(() => {
    console.log(`Scheduled batch generation ${new Date()}`);
  }, intervalDelay);

  res.status(200).send(`Schedule set for every ${intervalDelay}ms`);
};

export const clearSchedule = (req, res) => {
  clearInterval(interval);

  intervalDelay = undefined;
  interval = undefined;

  res.status(200).send(`Cleared schedule`);
};

export const getSchedule = (req, res) => {
  res.status(200).send({
    enabled: !!interval,
    delay: intervalDelay,
  });
};
