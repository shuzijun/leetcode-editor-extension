export {}
const questionData:ReplayMessage = {
    body: "", requestId: "", tabId: 0, type: "questionData", url: "",
    matching(details: chrome.webRequest.WebRequestBodyDetails, body: string): ReplayMessage {
      if (details.url==="https://leetcode.cn/graphql/"
      || details.url==="https://leetcode.com/graphql"){
        if ( body.indexOf("\"operationName\":\"questionData\"") > -1){
          return {
            body: body,
            requestId: details.requestId,
            tabId: details.tabId,
            type: this.type,
            url: details.url,
            retry:0
          }
        }
      }
    return
  },
  dispose(callback){
    fetch(this.url + "?track=no", {
      method: "POST",
      body: this.body,
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.json())
      .then(data => {
        let question = {
          "title": data.data.question.title,
          "slug": data.data.question.titleSlug
        };
        if ("translatedTitle" in data.data.question && data.data.question.translatedTitle != null) {
          question.title = data.data.question.translatedTitle;
        }
        callback([question]);
      });
  }
}

const leetbookPageDetail:ReplayMessage = {
  body: "", requestId: "", tabId: 0, type: "leetbookPageDetail", url: "",
  matching(details: chrome.webRequest.WebRequestBodyDetails, body: string): ReplayMessage {
    if (details.url==="https://leetcode.cn/graphql/"){
      if ( body.indexOf("\"operationName\":\"leetbookPageDetail\"") > -1){
        return {
          body: body,
          requestId: details.requestId,
          tabId: details.tabId,
          type: this.type,
          url: details.url,
          retry:0
        }
      }
    }
    return
  },
  dispose(callback){
    fetch(this.url + "?track=no", {
      method: "POST",
      body: this.body,
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.json())
      .then(data => {
        let question = {
          "title": data.data.leetbookPage.title,
          "slug": data.data.leetbookPage.question.questionTitleSlug
        };
        callback([question]);
      });
  }
}


const getQuestion:ReplayMessage = {
  body: "", requestId: "", tabId: 0, type: "GetQuestion", url: "",
  matching(details: chrome.webRequest.WebRequestBodyDetails, body: string): ReplayMessage {
    if (details.url==="https://leetcode.com/graphql"){
      if ( body.indexOf("\"operationName\":\"GetQuestion\"") > -1){
        return {
          body: body,
          requestId: details.requestId,
          tabId: details.tabId,
          type: this.type,
          url: details.url,
          retry:0
        }
      }
    }
    return
  },
  dispose(callback){
    fetch(this.url + "?track=no", {
      method: "POST",
      body: this.body,
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.json())
      .then(data => {
        let question = {
          "title": data.data.question.questionTitle,
          "slug": data.data.question.submitUrl.split("/")[2]
        };
        callback([question]);
      });
  }
}

const weeklyContest:ReplayMessage = {
  body: "", requestId: "", tabId: 0, type: "weeklyContest", url: "",
  matching(details: chrome.webRequest.WebRequestBodyDetails, body: string): ReplayMessage {
    if ((details.url.indexOf("https://leetcode.cn/contest/api/info/weekly-contest")>-1 ||
        details.url.indexOf("https://leetcode.com/contest/api/info/weekly-contest")>-1)
         && details.url.indexOf("track=no") < 0){
        return {
          body: "",
          requestId: details.requestId,
          tabId: details.tabId,
          type: this.type,
          url: details.url,
          retry:0
        }

    }
    return
  },
  dispose(callback){
    fetch(this.url + "?track=no", {
      method: "GET"
    }).then(response => response.json())
      .then(data => {
        let questions = [data.questions.length]
        for (let i = 0; i < data.questions.length; i++) {
          questions[i] = {
            "title": data.questions[i].title,
            "slug": data.questions[i].title_slug,
          };
        }
        callback(questions);
      });
  }
}


const replayMessages:ReplayMessage[] = [questionData,leetbookPageDetail,getQuestion,weeklyContest]

export const matchingType = (details: chrome.webRequest.WebRequestBodyDetails, body: string): ReplayMessage => {
  for (let i = 0; i < replayMessages.length; i++) {
    let message = replayMessages[i].matching(details,body)
    if (message){
      return message
    }
  }
  return
}

export const matchingDispose = (message:ReplayMessage): ReplayMessage => {
  for (let i = 0; i < replayMessages.length; i++) {
    if (message.type ===  replayMessages[i].type){
      message.dispose = replayMessages[i].dispose
      return message
    }
  }
  return message
}