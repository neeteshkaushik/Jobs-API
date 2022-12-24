const { StatusCodes } = require("http-status-codes");
const { BadReqError } = require("../errors");
const NotFoundError = require("../errors/not-found");
const Job = require("../models/Job");

const getAllJobs = async (req, res) => {
  const userId = req.user.userId;

  const jobs = await Job.find({ createdBy: userId });

  res.status(StatusCodes.OK).json({ jobs, jobsLen: jobs.length });
};

const getJob = async (req, res) => {
  const jobId = req.params.id;

  const userId = req.user.userId;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) throw new NotFoundError(`No job found with jobId: ${jobId}`);

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position)
    throw new BadReqError("company and position cannot be empty");

  const userId = req.user.userId;

  const job = await Job.create({ company, position, createdBy: userId });

  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position)
    throw new BadReqError("company and position cannot be empty");
  const jobId = req.params.id;
  const userId = req.user.userId;

  const updatedJob = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedJob) throw new NotFoundError(`No job found with jobId:${jobId}`);

  res.status(StatusCodes.OK).json({ updatedJob });
};

const deleteJob = async (req, res) => {
  const jobId = req.params.id;

  const userId = req.user.userId;

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

  if (!job) throw new NotFoundError(`No job found with jobId: ${jobId}`);

  res.status(StatusCodes.OK).json({ job });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
