const logger = require('../utils/logger');
const Project = require('../models/project');

const admin = require("firebase-admin");

exports.createProjectOld = async (req, res) => {
  // Make a copy of the req.body
  let data = { ...req.body };

  if (!data)
    return res.status(400).json({
      message: 'No data in the request',
    });

  try {
    // Create record in db
    const createdProject = await Project.create({
      ...data,
    });

    if (createdProject) {
      // Send Response to client
      res.status(201).json({
        createdProject: createdProject,
      });
    }
  } catch (err) {
    logger.error({
      message: 'Error on Project.controller (createProject):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.createProject = async (req, res) => {
  // Make a copy of the req.body
  let data = { ...req.body };

  if (!data)
    return res.status(400).json({
      message: 'No data in the request',
    });

  try {
    // Create record in db
    const createdProject = await Project.create({
      ...data,
    });

    if (createdProject) {
      // Send Response to client
      res.status(201).json({
        createdProject: createdProject,
      });
    }
  } catch (err) {
    logger.error({
      message: 'Error on Project.controller (createProject):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getProject = async (req, res) => {
  // Params
  const id = req.params.id;

  try {
    // Find By Id
    if (id !== null) {
      const project = await Project.findByPk(id);
      if (project) {
        return res.status(200).json(project.get({ plain: true }));
      }
    }

    return res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Projects.controller (readProject):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.getProjects = async (req, res) => {
  // Query Variable
  const query = req.query;
  const limit = +query.limit;

  try {
    // Find by uid
    if (query.uid) {
      const Projects = await Project.findAll({
        where: {
          uid: query.uid,
        },
        limit: limit || 15,
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        projects: Projects,
      });
    }

    // Find by workerId
    if (query.workerId) {
      const projects = await Project.findAll({
        where: {
          workerId: query.workerId,
        },
        limit: limit || 15,
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        projects: projects,
      });
    }

    // Find by workerId
    if (query.workerId) {
      const projects = await Project.findAll({
        where: {
          workerId: query.workerId,
        },
        limit: limit || 15,
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        projects: projects,
      });
    }

    // Find by status
    if (query.status) {
      const projects = await Project.findAll({
        where: {
          status: query.status,
        },
        limit: limit || 15,
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({
        projects: projects,
      });
    }

    // Show all projects to certain limit
    const projects = await Project.findAll({
      limit: limit || 15,
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      projects: projects,
    });
  } catch (err) {
    logger.error({
      message: 'Error on Projects.controller (readProjects):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.updateProject = async (req, res) => {
  // Params
  const id = req.params.id;

  // Data to update
  const data = req.body;

  try {
    // Update project
    const updatedRows = await Project.update(
      { ...data },
      {
        where: {
          id: id,
        },
      }
    );
    // Get updated project
    const updatedProject = await Project.findOne({
      where: {
        id: id,
      },
    });

    if (updatedProject) {
      // Send the project to client
      return res.status(200).json({
        updatedRows: updatedRows[0],
        updatedProject: updatedProject.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Projects.controller (updateProject):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.deleteProject = async (req, res) => {
  // Params
  const id = req.params.id;
  try {
    const params = {
      where: {
        id: id,
      },
    };

    // Fetch record and then delete
    const deletedProject = await Project.findOne({ ...params });

    if (deletedProject) {
      const destroyVar = await Project.destroy(params);
      return res.status(200).json({
        deleted: destroyVar ? true : false,
        deletedProject: deletedProject.get({ plain: true }),
      });
    }

    res.status(404).json({ error: 'data not found' });
  } catch (err) {
    logger.error({
      message: 'Error on Projects.controller (deleteProject): ',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
};

exports.createFirebaseProject = async (req, res) => {

  const {title, category, description,image,latitude,longitude} = req.body;

  try {
    // Find By Id
    let job = {
      title,
      category,
      description,
      image,
      latitude,
      longitude,
      status: 1,
      createdDate: Date.now(),
      editedDate: Date.now()
    }
    const db = admin.firestore();
    db.collection("jobs").add(job).then(()=>{
      return res.status(200).json({
        status: true,
        job
      });
    })
  } catch (err) {
    logger.error({
      message: 'Error on Projects.controller (readProject):',
      error: err,
    });
    return res.status(500).json({ err, message: err.toString() });
  }
}

exports.getProjectList = async (req, res) => {
  try {
    const db = admin.firestore();
    db.collection("jobs").get()
    .then((querySnapshot) => {
      let jobs = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            let jobDetails = doc.data();
            jobDetails['projectId'] = doc.id;
            let job = {
              data: jobDetails
            }
            jobs.push(job)
        });
        return res.status(200).json({
          status: true,
          jobs
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  } catch (err) {
    logger.error({
      message: 'Error on Projects.controller (getProjectList):',
      error: err,
    });
    console.log("error came here");
    return res.status(500).json({ err, message: err.toString() });
  }
}