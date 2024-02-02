## Getting Started with TODO FullStack Application
 ## Frontend
This project's frontend was developed using HTML, CSS, JavaScript, and React.js.

Available Scripts
In the todolist-frontend directory, you can run the following commands:

npm install
Installs the required dependencies for the project.

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

 ## Backend
The backend of this project was built using Java Spring Boot, and it uses PostgreSQL as the database.

Running the Backend
Open the todolist-backend directory in IntelliJ or your preferred Java IDE.

Configure the PostgreSQL Database:

Open src/main/resources/application.yml.
Replace the spring.datasource.username and spring.datasource.password with your PostgreSQL credentials.
Specify the desired database name in spring.datasource.url.
Set the SDK version to 21 in IntelliJ.

Build the project using Maven. Run the following command in the terminal.

mvn clean install
Run the Spring Boot application.

The backend will be accessible at http://localhost:8081.

 ## Additional Notes
Ensure that PostgreSQL and mypgadmin4 are installed on your system.
Start the PostgreSQL server using mypgadmin4, and note the username and password used during installation.
Follow these steps, and you should have the TODO FullStack Application up and running on your local machine.
