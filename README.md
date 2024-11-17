
## Setup Instructions

Follow the steps below to set up the project on your local machine.

1. **Clone the Repository**:
   First, clone the repository to your local machine using the following command:
   
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**:
   
   ```bash
   cd <project-name>
   ```

3. **Install Dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Then, install the project dependencies:

   ```bash
   npm install
   ```

4. **Start the Local Development Server**:
   To start the development server, run:

   ```bash
   npm start
   ```

   This will launch the app on `http://localhost:3000`.

---

## Example JSON Schemas

Below are examples of JSON schemas that you can use to test the form builder.

### Example 1: Basic Form Schema

```json
{
  "formTitle": "Contact Form",
  "formDescription": "Please fill in your contact details.",
  "fields": [
    {
      "id": "name",
      "label": "Full Name",
      "type": "text",
      "placeholder": "John Doe",
      "required": true,
      "defaultValue": "",
      "validation": {
        "pattern": "^[a-zA-Z\\s]+$",
        "message": "Only letters and spaces are allowed"
      }
    },
    {
      "id": "email",
      "label": "Email",
      "type": "email",
      "placeholder": "example@example.com",
      "required": true,
      "validation": {
        "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        "message": "Please enter a valid email address"
      }
    }
  ]
}
```




```

## Local Development Guide

### Running the Project Locally

1. Clone the repository and navigate to the project folder.
   
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open `http://localhost:3000` in your browser to see the project in action.

### Development Workflow

1. **Make changes** to the code in your editor.
2. **View changes** automatically in the browser, as the development server runs in watch mode.
3. **Commit your changes** when you're happy with them.

   ```bash
   git add .
   git commit -m "Describe your changes"
   git push origin <branch-name>
   ```

---
