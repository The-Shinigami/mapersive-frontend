# mapersive-frontend

## Project Overview

Welcome to the **mapersive-frontend** project documentation. In this documentation, we will embark on a journey through the development of the **mapersive-frontend** project. This project involves creating a user interface for seamless interaction with insurance data. We'll explore our technology choices, dive into our page design, walk through implementation steps, and even touch on deploying with Docker. Let's dive into the details and see how it all unfolds!

## Step 1: Technology Selection

To craft an intuitive and highly functional user interface, I carefully curated the following technologies:

- **Tailwind CSS:** A powerful tool for crafting responsive styles and layouts.
- **Angular Material:** Elevating the experience with UI components like tables and cards.
- **Angular Framework:** Providing the robust foundation needed for building dynamic web applications.

## Step 2: Page Design

The project is thoughtfully structured around three key pages:

1. **New Insurance Form:** Empowering users to create new insurance records through a user-friendly form.
2. **Table View:** Presenting insurance records in a sortable table for quick access and reference.
3. **Card View:** Unveiling a visually appealing grid of cards to display insurance records elegantly.

## Step 3: Project Setup

Setting the stage for success, I organized the project with precision:

- **Components:** I curated an assortment of components, each serving a distinct purpose within the application.
- **Services:** A dedicated CRUD service expertly handles data operations, ensuring smooth interactions.
- **Shared Module:** For efficiency and clarity, a shared module streamlines common classes and functions for seamless integration among components.

## Step 4: Implementation

Here's where the magic happens! I breathed life into the project by bringing core features to life:

- **CRUD Service:** The beating heart of the project, this service orchestrates CRUD (Create, Read, Update, Delete) operations for insurance records.
- **Table Component:** With sorting functionality as a cornerstone, I constructed a table view that elegantly showcases insurance records.
- **Card Component:** Combining aesthetics and functionality, the card view beautifully presents insurance records within a responsive grid.

## Step 5: Enhancements

I'm not one to settle for ordinary. To enrich the user experience, I injected enhancements:

- **Responsiveness:** Empowering the application to seamlessly adapt to various devices, from desktops to mobile screens.
- **Scrollable Table:** Navigating through extensive data is a breeze with the addition of a scrollable feature to the table view.
- **Notifications:** The application provides real-time feedback through integrated notifications, be it record creation, updates, or deletions.

## Step 6: Project Deployment

### Generate Bundle
To deploy the project, I generated a project bundle using the Angular CLI's `ng build` command. This process compiles the application and creates optimized files ready for deployment.

### Create Dockerfile
For streamlined deployment across various environments, I crafted a Dockerfile. This Dockerfile outlines the precise instructions for constructing a Docker image that encapsulates the user interface and its essential dependencies.

## Getting Started

### Prerequisites

Before you immerse yourself in the magic of **mapersive-frontend**, ensure you have the following prerequisites in place:

- **Node.js 18.10:** A powerful runtime environment to execute JavaScript applications.
- **Angular CLI 16.2.0:** The command-line interface for Angular, ensuring streamlined development.

### Clone the Repository

Begin by cloning the project repository using the following command:
- git clone https://github.com/The-Shinigami/mapersive-frontend.git

### Running the API Locally

1. Install the required dependencies by running the command `npm install`.
2. Launch the application with `ng serve`.
   
**Access your interface by navigating to `localhost:4200` in your preferred web browser.**


