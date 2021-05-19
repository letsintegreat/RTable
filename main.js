var timeTable = [], tSize = 48;
var currentDate = new Date();
function prettyPrint() {
    let currentI = currentDate.getHours() * 2;
    if (currentDate.getMinutes() >= 30)
        currentI += 1;
    let outTable = {}, currentWork = timeTable[0], currentTimeStamp = "0:00 AM to ";
    for (let i = 0; i < tSize; i++) {
        if (timeTable[i] == currentWork.split(" ")[0]) {
            if (currentI == i) {
                console.log("reached");
                currentWork += ' ';
            }
            continue;
        }
        else {
            if (i < 26) {
                currentTimeStamp += Math.floor(i/2) + ":" + (i%2)*3 + "0 AM -> ";
                outTable[currentTimeStamp] = currentWork;
                currentWork = timeTable[i];
                currentTimeStamp = Math.floor(i/2) + ":" + (i%2)*3 + "0 AM to ";
            } else {
                currentTimeStamp += Math.floor((i-24)/2) + ":" + ((i-24)%2)*3 + "0 PM -> ";
                outTable[currentTimeStamp] = currentWork;
                currentWork = timeTable[i];
                currentTimeStamp = Math.floor((i-24)/2) + ":" + ((i-24)%2)*3 + "0 PM to ";
            }
        }
        if (currentI == i) {
            console.log("reached");
            currentWork += ' ';
        }
    }
    currentTimeStamp += "00:00 AM -> ";
    outTable[currentTimeStamp] = currentWork;

    for (const [key, value] of Object.entries(outTable)) {
        let iStamp = document.createElement('div');
        iStamp.className = "stamp";
        iStamp.innerHTML = key.slice(0,5);
        document.body.appendChild(iStamp);

        let iWork = document.createElement('div');
        iWork.className = "work";
        if (value[value.length - 1] == " ")
            iWork.className += ' current';
        iWork.innerHTML = value;
        document.body.appendChild(iWork);
    }
}
function randomize() {
    let studyBlocks = Math.floor(Math.random()*7) + 10, uStudyBs = 0, uTimepassBs = 0;
    let timepassBlocks = 25-studyBlocks;
    for (let i = 0; i < tSize; i++) {
        if (i < 16)
            timeTable[i] = "Sleep";
        else if (i < 19)
            timeTable[i] = "Chorus";
        else if (i < 27) {
            if (uStudyBs >= studyBlocks) {
                timeTable[i]= "Timepass";
                uTimepassBs++;
            } else if (uTimepassBs >= timepassBlocks) {
                timeTable[i] = "Study";
                uStudyBs++;
            } else if (Math.random() < 0.5) {
                timeTable[i] = "Study";
                uStudyBs++;
            } else {
                if (timeTable[i-1] == "Study" && timeTable[i-2] !=  "Study") {
                    timeTable[i] = "Study";
                    uStudyBs++;
                } else {
                    timeTable[i] = "Timepass";
                    uTimepassBs++;
                }
            }
        }
        else if (i < 29)
            timeTable[i] = "Lunch";
        else if (i < 40) {
            if (uStudyBs >= studyBlocks) {
                timeTable[i]= "Timepass";
                uTimepassBs++;
            } else if (uTimepassBs >= timepassBlocks) {
                timeTable[i] = "Study";
                uStudyBs++;
            } else if (Math.random() < 0.5) {
                timeTable[i] = "Study";
                uStudyBs++;
            } else {
                if (timeTable[i-1] == "Study" && timeTable[i-2] !=  "Study") {
                    timeTable[i] = "Study";
                    uStudyBs++;
                } else {
                    timeTable[i] = "Timepass";
                    uTimepassBs++;
                }
            }
        }
        else if (i < 42)
            timeTable[i] = "Dinner";
        else {
            if (uStudyBs >= studyBlocks) {
                timeTable[i]= "Timepass";
                uTimepassBs++;
            } else if (uTimepassBs >= timepassBlocks) {
                timeTable[i] = "Study";
                uStudyBs++;
            } else if (Math.random() < 0.5) {
                timeTable[i] = "Study";
                uStudyBs++;
            } else {
                if (timeTable[i-1] == "Study" && timeTable[i-2] !=  "Study") {
                    timeTable[i] = "Study";
                    uStudyBs++;
                } else {
                    timeTable[i] = "Timepass";
                    uTimepassBs++;
                }
            }
        }
    }
}
window.onload = function () {
    if (localStorage.getItem("timetableondate" + currentDate.getDate())) {
        timeTable = localStorage.getItem("timetableondate" + currentDate.getDate()).split(",");
        prettyPrint();
    } else {
        timeTable = [];
        randomize();
        prettyPrint();
        localStorage.clear();
        localStorage.setItem("timetableondate" + currentDate.getDate(), timeTable);
    }
}
