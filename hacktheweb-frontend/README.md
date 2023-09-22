<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> The HackTheWeb platform serves as an educational tool, providing users with a comprehensive understanding of various web application attacks and their practical execution.
>
> HackTheWeb's aim is to empower users with the knowledge and skills required to either build robust, secure web applications or to effectively assess their security through penetration testing. Participants will advance through the program by progressively mastering web application attacks, advancing to higher levels upon successful completion. Additionally, an AI chatbot is available to assist users when they encounter challenges at any level, offering valuable information and tips to help them overcome obstacles and progress further.

### User Stories
- As a student, i want to login to the platform so that i would see the user dashboard.
- As a web app developer, i want to be able to see the ranks of the top hackers so that i would evaluate myself.
- As a penetration tester, i want to implement web app attacks on the platform so that i would know how to test it on my company’s application.
- As an SOC analyst, i want to communicate with an AI-driven chatbot so that i would be guided on how to implement the attack.
- As any user, i want to see details about the attack definition so that i would learn more about web app attacks before implementing.
- As a DevSecOps professional, i want to be able to see the vulnerable code so that i would be able to secure my projects.
- As a software developer, i want to be able to alter between levels so that i would implement more advanced attacks. 
- As an admin, i want to be able to login to the platform so that i would access to admin console.
- As an admin, i want to be able to perform CRUD operations so that i would manage users.
- As an admin, i want to be able to perform CRUD operations so that i would manage labs
- As an admin, i want to be able to perform CRUD operations so that i would manage badges.
- As a student, i want to be able to list all the labs so that i would press the one i am interested in.
- As a penetration tester, i want to be able to have a score that i would rank between other professionals.
- As a student, i want to be able to restart the lab so that i would be able to implement the attack again
- As a web app developer, i want to view the implementation so that i would be able to securely develop my apps.
- As a SOC analyst, i want to logout from the platform so that i would stop training.

<br><br>

<!-- Prototyping -->
<img src="./readme/title3.svg"/>

> We designed HackTheWeb using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

### Wireframes
| Landing screen | Login modal | Register modal |
| ![Landing](./readme/Wireframes/index.png) | ![Login](./readme/Wireframes/login.png) | ![Register](./readme/Wireframes/Register.png) |

### Mockups
| Dashboard screen  | Lab Screen | Leaderboard Screen |
| ---| ---| ---|
| ![Dashboard](./readme/demo/1440x1024.png) | ![Leaderboard](./readme/demo/1440x1024.png) | ![Lab](./readme/demo/1440x1024.png) |

<br><br>

<!-- Implementation -->
<img src="./readme/title4.svg"/>

> Using the wireframes and mockups as a guide, we implemented the HackTheWeb app with the following features:

### User Screens (Web)
| Login screen  | Register screen | Landing screen | Loading screen |
| ---| ---| ---| ---|
| ![Landing](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) |
| Home screen  | Menu Screen | Order Screen | Checkout Screen |
| ![Landing](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) |

### Admin Screens (Web)
| Login screen  | Register screen |  Landing screen |
| ---| ---| ---|
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |
| Home screen  | Menu Screen | Order Screen |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>

<!-- Tech stack -->
<img src="./readme/title5.svg"/>

###  HackTheWeb is built using the following technologies:

- This project uses the [React JS](https://legacy.reactjs.org/) library. ReactJS (aka React) is an open-source JavaScript-based user interface library. It is insanely popular in web development communities today. React Native is equally popular among mobile application developers.
- For persistent storage (database), the app uses [MySQL](https://www.mysql.com/), an open-source relational database management system (RDBMS) that is widely used for storing and managing structured data.
- This project uses the [Laravel](https://laravel.com/) PHP Framework. Laravel is a powerful and popular open-source PHP framework known for its simplicity and elegance. It simplifies web application development by providing tools and libraries for tasks like routing, authentication, and database management, enabling developers to build robust and maintainable web applications more efficiently.
- To create isolated labs, the app uses the [Docker](https://www.docker.com/) technology. Docker is a platform that enables developers to create, deploy, and run applications in containers.
- The app uses the font ["Work Sans"](https://fonts.google.com/specimen/Roboto+Mono) as its main font, and the design of the app adheres to the material design guidelines.

<br><br>

<!-- How to run -->
<img src="./readme/title6.svg"/>

> To set up HackTheWeb locally, follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

Now, you should be able to run HackTheWeb locally and explore its features.