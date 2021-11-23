const express = require('express');
const app = express();
const Views = '../views/'
const http = require('http');
const fs = require('fs');
const Quiz = require('../models/quizModel');

module.exports = {
    index: (req, res) => {
      res.render('index');
    },
    getQuiz: async (req ,res) => {
      try{
         const quizData = await Quiz.getQuiz();
         return res.json(quizData)
      } catch(err) {
        console.log(err)
      }

    }
  }