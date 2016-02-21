# UIST-W6-Networked-Art

Steven and TingWei's UIST 520 W6 assignment

Requires local server to run

Updates

1. Commented out mousePressed() function.

2. Added myRec object and related continuous speech recognition functions. 
   Speech will trigger The function will trigger function showResult() to run. (line 387)
   myRec.resultString.split(' ').pop() is used to substract the most recent recorded word.

3. Added   socket.emit('sense', { deviceShaken: true}); and socket.on('deviceShaken', deviceShaken); for mobile control.
   Mobile will trigger deviceShaken() function (line 417) which will call addRain() function (line 304).
   addRain() function adds value to rain[] with randomed x and y location.
   When there are values inside rain[], the rain will be drew (line 237), 
   and when the rain goes out of the windows, it will be deleted with rain.pop()