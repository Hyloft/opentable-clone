<h1 style='text-align: center;'>OpenTable Clone</h1>

<p align="center">
  A project developed to gain hands-on experience in building a booking and availability system.
</p>

![Main Page](./public/images/main_page.png)


<h3 style='text-align: center;'>Tech Stack</h3>

<div align="center">

  ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
  ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
  ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

</div>

## Key Features of This Project:

- Advanced Booking & Availability System
- Comprehensive Restaurant Filtering
- Comment and Ranking System
- User Authentication
- Registration Validation

## How the Booking Service Works

1. Choose the number of people and desired reservation time.
2. View available times for the selected criteria near the chosen time.

   ![Available Times GIF](<GIF_URL>)

3. Click on your preferred time to temporarily reserve the booking.

   ![Reservation GIF](<GIF_URL>)

4. The reservation is held until you close the window or the duration ends.

The system utilizes **Redis** and **WebSocket** for temporary reservations.

<img src='./public/images/carbon.png' style='width:720px;'>

5. Other users cannot book the tables at the time you reserved except if the restaurant has any other available tables.

    ![No Reservation GIF](<GIF_URL>)