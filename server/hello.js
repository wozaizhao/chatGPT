// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const axios = require('axios');
const EventDB = aircode.db.table("request");
module.exports = async function(params, context) {
  console.log('Received params:', params);
  const question = params.q;
  const answer = await getOpenAIReply(question);
  await EventDB.save({ question: question, answer: answer });
  return {
    answer: answer,
  };
}

// 通过 OpenAI API 获取回复
async function getOpenAIReply(content) {
    var prompt = "你是 ChatGPT, 一个由 OpenAI 训练的大型语言模型, 你旨在回答并解决人们的任何问题，并且可以使用多种语言与人交流。\n请回答我下面的问题\nQ: " + content + "\nA: ";
  
    var data = JSON.stringify({
        "model": "text-davinci-003",
        "prompt": prompt,
        "max_tokens": 1024,
        "temperature": 0.9,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0,
        "top_p": 1,
        "stop":["#"]
    });

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.openai.com/v1/completions',
        headers: {
            'Authorization': `Bearer ${process.env.KEY}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    const response = await axios(config)
    // 去除多余的换行
    return response.data.choices[0].text.replace("\n\n", "")
}