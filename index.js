const express = require('express');
const mongoose = require('mongoose');
const { employeeRouter } = require('./routes/EmployeesRoutes');
const { userRoute } = require('./routes/UserRoutes');
const jwt = require('jsonwebtoken');
const Users = require('./models/Users');
const RefreshToken = require('./models/RefreshToken');
const passport = require('passport');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const app = express();
const secreteKey = 'fjbsd343FWEigWfds45gousrdgo';
const refreshTokenSecreteKey = 'fjbsd343FWEigWfds45gofgdf32DWEusrdgo';
const cors = require('cors');

app.use(express.json());

mongoose.connect('mongodb+srv://sujeetkar0:Sujeet%402000@cluster0.xaxehsn.mongodb.net/rest-api-mongodb');

const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected to mongodb');
    app.listen(8001, () => console.log('app started on port 8001'));
    console.log('http://localhost:8001/api-docs')
})

db.on('error', (error) => {
    console.log('error connecting to the mongodb!', error);
})

const authenticateUser = async(req, res, next) => {
    try {
      if(!req.headers.authorization) {
        return res.status(401).json({message: 'AccessToken not found'});
      }
      const accessToken = req.headers.authorization.split(' ')[1];

        const decodeToken = jwt.verify(accessToken, secreteKey);
        req.user = {id: decodeToken.userId}
        next();
    } catch(error) {
        console.log(error);
        return res.status(401).json({message: 'Access token invalid or expired'});
    }
}

const authorizeUser = (roles = []) => {
    return async function (req, res, next) {
        const user = await Users.findOne({_id: req.user.id});
        console.log('roles : ', roles); 
        console.log('user role : ', user);
        console.log('user role : ', user.role);
        if(!user || !roles.includes(user.role)) {
            return res.status(403).json({message: 'Access denied'});
        }
        next()
    }
}

const authenticateRefreshToken = async(req, res, next) => {
    const { refreshToken } = req.body;
    if(!refreshToken) {
        return res.status(401).json({message: 'Refresh token not found'})
    }

    const decodeRefreshToken = jwt.verify(refreshToken, refreshTokenSecreteKey);

    const userRefreshToken = await RefreshToken.findOne({refreshToken, userId: decodeRefreshToken.userId})

    if(!userRefreshToken) {
        return res.status(401).json({message: 'Refresh token expired or invalid'});
    }

    await RefreshToken.delete({rere})

}

const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Techentry Workshop APIs",
      version: "0.0.1",
      description: "Techentry Workshop APIs",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"], // Path to your API documentation files
};

// Generate Swagger specs
const specs = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    swaggerOptions: {
      authActions: {
        bearerAuth: {
          name: "Authorization",
          schema: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "JWT token in the format 'Bearer <token>'",
          },
          value: "<JWT token>", // Example value to show the format in Swagger UI
        },
      },
    },
  })
);

// app.use(cors())
app.use('/employees', authenticateUser, authorizeUser(['user']),  employeeRouter);
app.use('/user', userRoute);
