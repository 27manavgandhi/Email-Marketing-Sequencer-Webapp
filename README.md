
# MERN Email Sequence Manager

The MERN Email Sequence Manager is a web application designed to allow users to design and implement email marketing sequences using a visual flowchart interface. It utilizes the MERN stack, which includes MongoDB, Express.js, React, and Node.js, for both the frontend and backend development. The application provides users with an intuitive interface to create, edit, and visualize email marketing sequences as flowcharts, along with backend services to manage sequence data efficiently.


    
    


## Features

- **User-friendly interface:** The application provides a visual flowchart interface for creating and editing email marketing sequences.
- **Customizable nodes:** Each node in the flowchart can be customized with specific parameters, such as email content or duration.
- **Sequence management:** Users can save, load, edit, and delete email sequences, ensuring easy management of marketing campaigns.
- **Backend services:** The backend provides RESTful APIs to handle CRUD operations for email sequences and nodes.
- **Authentication and authorization:** The application ensures data security and user privacy by implementing authentication and authorization mechanisms.


## Tech Stack

- **Frontend:**
    - React: A JavaScript library for building user interfaces.
    - React Flow: A library for building interactive node-based graphs in React.
    - Bootstrap: A popular CSS framework for building responsive and mobile-first websites.
- **Backend:**
    - Node.js: A JavaScript runtime environment for executing JavaScript code server-side.
    - Express.js: A web application framework for Node.js used for building APIs and handling HTTP requests.
    - MongoDB: A NoSQL database for storing sequence data efficiently.
    - Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a schema-based solution for modeling application data.
## Environment Variables


To run this project, you will need to create a .env file in the backend folder of this project

`PORT` : Port Number like 3000

`MONGODB_URL` : MongoDB Connection String

`JWT_SECRET` : Secret Key for Authentication

`NODE_ENV` : Environment eg development , production




## Run Locally

1) Clone the Repository
```bash
  git clone https://github.com/weebySagar/email-marketing-futureblink

```

2) Go to the project directory

```bash
  cd email-marketing-futureblink
```

3) Install dependencies

```bash
  cd backend
  npm install

  cd frontend
  npm install

```

4) Start the server

```bash
  cd backend
  npm run dev

  cd frontend
  npm run dev
```


5) Open your browser and visit http://localhost:5173 to view the project app locally.


## Deployment

The  website is deployed on https://email-marketing-futureblink.onrender.com/.  Please visit the link to explore the live version of the website.

