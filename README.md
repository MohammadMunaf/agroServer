## Getting Started

### Prerequisites

- Ensure you have Node.js and npm installed on your machine.

### Installation

1. **Download and Setup:**
   - Download the project zip file.
   - Extract the zip file to your desired location.
   - Open the project folder in Visual Studio Code (VSCode).

2. **Install Dependencies:**
   - Open the terminal in VSCode.
   - Install dependencies using npm:
     ```bash
     npm install
     ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the root directory if not already present.
   - Add the following content to `.env`:
     ```dotenv
     DB_URL=mongodb+srv://mohammadmehfooz100:H1tMjCIjt9AtwVS0@cluster0.nobikd3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     PORT=3001
     ```

## Running the Application

1. **Start the Server:**
   - In the terminal, run:
     ```bash
     node index.js
     ```
   - This command starts the server at the specified port (3001 in this case).