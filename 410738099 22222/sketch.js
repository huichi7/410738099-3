var colors = "e6f5b0-dda249-8ce7e4-cad8de-e67c4f".split("-").map(a=>"#"+a)
var colors_r = "aaaaaa-bbbbbb-cccccc-dddddd-eeeeee".split("-").map(a=>"#"+a)
var clr,clr_r
var positionListX =[]  
var positionListY =[]  
var clrList=[]     
var clr_r_List = []  
var sizeList =[]  
let handpose;
let video;
let predictions = [];
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX16,pointerY16,d
let pointerX14,pointerY14,pointerX10,pointerY10
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  for(var j=0;j<6;j++){  
    positionListX.push(random(width))
    positionListY.push(random(height))
    clrList.push(colors[int(random(colors.length))])
    clr_r_List.push(colors_r[int(random(colors_r.length))])
    sizeList.push(random(0.5,1.5))
    push() 
      translate(positionListX[j],positionListY[j]) 
      clr = clrList[j]
      clr_r = clr_r_List[j]
      drawFlower(clr,clr_r,sizeList[j]) 
    pop()
    }
   //取得攝影機開始執行
   video = createCapture(VIDEO);//取得攝影機的影像並把畫面放到video
   video.size(width, height);
      handpose = ml5.handpose(video, modelReady);
   handpose.on("predict", (results) => { 
     predictions = results;
   });
   video.hide();
}
function modelReady() {
  console.log("start");
}
function draw() {  //攝影機反向
  translate(width, 0);
  scale(-1, 1);
 background(255); 
 image(video,0,0,width,height);
 d= dist(pointerX8,pointerY8,pointerX16,pointerY16)
 for(var j=0;j<positionListX.length;j++){   
 r_Flower(clrList[j], clr_r_List[j],sizeList[j],positionListX[j],positionListY[j])
  }
  drawKeypoints(); //取得手指位置
   }
function drawFlower(clr,clr_r,size=1){  
  push()
    scale(size) 
    
  fill(clr)
  arc(0,-15,250,450,180,0)//頭髮
  fill("#ffddd2")
  arc(0,-132,155,230,0,180)//臉
  fill(0)
  rect(15,-105,35,2)//右眉毛
  rect(-50,-105,35,2)//左眉毛
  ellipse(25,-80,15,7)//右眼睛
  ellipse(-25,-80,15,7)//左眼睛


  
  fill("#ffddd2")
  beginShape()//鼻子開始
  curveVertex(0,-110)
  curveVertex(0,-75)
  curveVertex(0,-55)
  curveVertex(10,-55)
  curveVertex(9,-65)
  endShape(close)//鼻子結束
 
  fill("#e5989b")
  arc(0,-32,11,5,180,0)//上嘴左
  arc(8,-32,11,5,180,0)//上嘴右
  
  fill("#e5989b")
  arc(3.5,-32,20,5,0,180)//下嘴
  fill(0)
  beginShape()
  curveVertex(0,-30.5)
  curveVertex(0,-30.5)
  fill(0)
  rect(-2.5,-32,14,0.1)
  fill("#ffddd2")
  arc(14,-38,7,5,220,35)//嘴角線
  rotate(PI/1.5)
      
}
function mousePressed(){
positionListX.push(mouseX) 
positionListY.push(mouseY)
clrList.push(colors[int(random(colors.length))])
clr_r_List.push(colors_r[int(random(colors_r.length))])
sizeList.push(random(0.5,1.5))
let data_length = positionListX.length
push() 
  translate(positionListX[data_length-1],positionListY[data_length-1]) 
  clr = clrList[data_length-1]
  clr_r = clr_r_List[data_length-1]
  drawFlower(clr,clr_r,sizeList[data_length-1]) 
pop()
}
//畫出第8 16 20點
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      if (j == 8) {   
    pointerX8 = map(keypoint[0],0,640,0,width) 
    pointerY8 = map(keypoint[1],0,480,0,height)
        pointerZ8 = map(keypoint[2],0,480,0,height)
        console.log(pointerZ8)
        if(pointerZ8<-40)
        {
          R_draw(pointerX8,pointerY8)
        }
    ellipse(pointerX8, pointerY8, 30, 30);
      } 
   else
      if (j == 16) {   
    fill(255,0,0)
        pointerX16 = map(keypoint[0],0,640,0,width)
        pointerY16 = map(keypoint[1],0,480,0,height)
        ellipse(pointerX16, pointerY16, 30, 30);
      } 
   if (j == 20) {   
    fill(255,0,0)
        pointerX20 = map(keypoint[0],0,640,0,width)
        pointerY20 = map(keypoint[1],0,480,0,height)
        ellipse(pointerX20, pointerY20, 30, 30);
      } 
   else
      if (j == 14) { 
        pointerX14 = keypoint[0];
        pointerY14 =  keypoint[1];
      } else
      if (j == 10) { 
        pointerX10 = keypoint[0];
        pointerY10 =  keypoint[1];
     }
   }
  }
}
 function r_Flower(F_clr,F_clr_r,F_size,F_x,F_y){
   push()
    translate(F_x,F_y);
    if(pointerY14<pointerY16){  
     drawFlower(F_clr,F_clr_r,map(d,0,500,F_size-1.2,F_size+1.3)) 
    }else
    {rotate(frameCount/20)
     drawFlower(F_clr,F_clr_r,F_size)}
   pop()
}
 function R_draw(handX,handY){
  positionListX.push(handX) 
  positionListY.push(handY)
  clrList.push(colors[int(random(colors.length))])
  clr_r_List.push(colors_r[int(random(colors_r.length))])
  sizeList.push(random(0.5,1.5))
  let data_length = positionListX.length
  push() 
   translate(positionListX[data_length-2],positionListY[data_length-2]) 
   clr = clrList[data_length-2]
   clr_r = clr_r_List[data_length-2]
   drawFlower(clr,clr_r,sizeList[data_length-2]) 
  pop()
}