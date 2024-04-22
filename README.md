# Nguyen Thanh Tri - Backend Programmer Intern Test
## Overview

This project involves three main tasks focusing on different aspects of software development:

- JavaScript algorithm and problem solving.
- Backend API development with Express and MongoDB and deploy on AWS.
- Frontend development with React for a Family Tree Management System (FTMS).

## Detail
For more detail about implementation or development about each task, please move in and read the `README.md` for each folder task.

## Uncomplete tasks

**Task 3**

- The task of `import and edit additional fields such as "Father", "Mother", "Spouse" and sibling to the Family Tree` encounters a challenge due to the need to override the data.json file. However, in the context of React, this approach seems impractical as React does not support file writing in local storage. Therefore, an alternative approach needs to be explored to incorporate these additional fields into the Family Tree system without relying on file manipulation.

- With this issue, I think we'll need to create a backend server to handle updates and import data directly from the user's end into the project. I believe tackling this will require some changes such as storage methods, data read/write operations, and establishing connections between the backend and frontend servers. This will take some time to implement and fine-tune, but my priority goal is to create a family tree, not just focus on data management. Therefore, I prioritize the frontend aspect more.

## Challenges faced and some notes for the test

**1. Connecting MongoDB with Express Backend**
- Issue: Encountered errors when accessing MongoDB from different IP addresses, resulting in connection refusal. This was noticed while conducting the test.
- Solution: Implement security measures such as allowing all traffic or configuring specific traffic permissions in MongoDB settings to resolve this issue.
**2. Custom Configurations for EC2 Instances in AWS**
- Issue: Custom configurations for EC2 instances in AWS can impact deployment and server operations on virtual machines.
- Solution: Recommend utilizing default settings whenever possible and thoroughly reviewing security measures for all paths to mitigate potential risks.