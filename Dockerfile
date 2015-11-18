FROM quay.io/ukhomeofficedigital/nodejs:v1.0.0


RUN npm run postinstall
CMD ["npm start"]
