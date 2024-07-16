import cv2

def draw_lines(image, type, points):
    if type == "pose" :       
        #boca
        cv2.line(image, (int(points[10].x * 450), 
                         int(points[10].y * 450)
                        ),
                        (int(points[9].x * 450), 
                         int(points[9].y * 450)
                        ), (0,121,121),5)
        
         #corpo
        cv2.line(image, (int(points[12].x * 450), 
                         int(points[12].y * 450)
                        ),
                        (int(points[11].x * 450), 
                         int(points[11].y * 450)
                        ), (0,121,121),5)
        cv2.line(image, (int(points[12].x * 450), 
                         int(points[12].y * 450)
                        ),
                        (int(points[24].x * 450), 
                         int(points[24].y * 450)
                        ), (0,121,121),5)
        cv2.line(image, (int(points[24].x * 450), 
                         int(points[24].y * 450)
                        ),
                        (int(points[23].x * 450), 
                         int(points[23].y * 450)
                        ), (0,121,121),5)
        cv2.line(image, (int(points[23].x * 450), 
                         int(points[23].y * 450)
                        ),
                        (int(points[11].x * 450), 
                         int(points[11].y * 450)
                        ), (0,121,121),5)
        
        # braço esquerdo
        cv2.line(image, (int(points[12].x * 450), 
                         int(points[12].y * 450)
                        ),
                        (int(points[14].x * 450), 
                         int(points[14].y * 450)
                        ), (0,121,121),5)
        cv2.line(image, (int(points[16].x * 450), 
                         int(points[16].y * 450)
                        ),
                        (int(points[14].x * 450), 
                         int(points[14].y * 450)
                        ), (0,121,121),5)

        # braço direito
        cv2.line(image, (int(points[11].x * 450), 
                         int(points[11].y * 450)
                        ),
                        (int(points[13].x * 450), 
                         int(points[13].y * 450)
                        ), (0,121,121),5)
        cv2.line(image, (int(points[15].x * 450), 
                         int(points[15].y * 450)
                        ),
                        (int(points[13].x * 450), 
                         int(points[13].y * 450)
                        ), (0,121,121),5)
    elif type == "left_hand" :
        # palma
        cv2.line(image, (int(points[0].x * 450), 
                         int(points[0].y * 450)
                        ),
                        (int(points[5].x * 450), 
                         int(points[5].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[5].x * 450), 
                         int(points[5].y * 450)
                        ),
                        (int(points[9].x * 450), 
                         int(points[9].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[9].x * 450), 
                         int(points[9].y * 450)
                        ),
                        (int(points[13].x * 450), 
                         int(points[13].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[13].x * 450), 
                         int(points[13].y * 450)
                        ),
                        (int(points[17].x * 450), 
                         int(points[17].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[17].x * 450), 
                         int(points[17].y * 450)
                        ),
                        (int(points[0].x * 450), 
                         int(points[0].y * 450)
                        ), (80,0,121),5)
        
        #polegar
        cv2.line(image, (int(points[1].x * 450), 
                         int(points[1].y * 450)
                        ),
                        (int(points[0].x * 450), 
                         int(points[0].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[1].x * 450), 
                         int(points[1].y * 450)
                        ),
                        (int(points[2].x * 450), 
                         int(points[2].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[2].x * 450), 
                         int(points[2].y * 450)
                        ),
                        (int(points[3].x * 450), 
                         int(points[3].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[3].x * 450), 
                         int(points[3].y * 450)
                        ),
                        (int(points[4].x * 450), 
                         int(points[4].y * 450)
                        ), (80,0,121),5)
        
        #indicador
        cv2.line(image, (int(points[5].x * 450), 
                         int(points[5].y * 450)
                        ),
                        (int(points[6].x * 450), 
                         int(points[6].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[6].x * 450), 
                         int(points[6].y * 450)
                        ),
                        (int(points[7].x * 450), 
                         int(points[7].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[7].x * 450), 
                         int(points[7].y * 450)
                        ),
                        (int(points[8].x * 450), 
                         int(points[8].y * 450)
                        ), (80,0,121),5)
        
        # dedo do meio
        cv2.line(image, (int(points[9].x * 450), 
                         int(points[9].y * 450)
                        ),
                        (int(points[10].x * 450), 
                         int(points[10].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[10].x * 450), 
                         int(points[10].y * 450)
                        ),
                        (int(points[11].x * 450), 
                         int(points[11].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[11].x * 450), 
                         int(points[11].y * 450)
                        ),
                        (int(points[12].x * 450), 
                         int(points[12].y * 450)
                        ), (80,0,121),5)
        
        # anelar
        cv2.line(image, (int(points[13].x * 450), 
                         int(points[13].y * 450)
                        ),
                        (int(points[14].x * 450), 
                         int(points[14].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[14].x * 450), 
                         int(points[14].y * 450)
                        ),
                        (int(points[15].x * 450), 
                         int(points[15].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[15].x * 450), 
                         int(points[15].y * 450)
                        ),
                        (int(points[16].x * 450), 
                         int(points[16].y * 450)
                        ), (80,0,121),5)
        
        # mindinho
        cv2.line(image, (int(points[17].x * 450), 
                         int(points[17].y * 450)
                        ),
                        (int(points[18].x * 450), 
                         int(points[18].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[18].x * 450), 
                         int(points[18].y * 450)
                        ),
                        (int(points[19].x * 450), 
                         int(points[19].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[19].x * 450), 
                         int(points[19].y * 450)
                        ),
                        (int(points[20].x * 450), 
                         int(points[20].y * 450)
                        ), (80,0,121),5)
    elif type == "right_hand" :
        # palma
        cv2.line(image, (int(points[0].x * 450), 
                         int(points[0].y * 450)
                        ),
                        (int(points[5].x * 450), 
                         int(points[5].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[5].x * 450), 
                         int(points[5].y * 450)
                        ),
                        (int(points[9].x * 450), 
                         int(points[9].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[9].x * 450), 
                         int(points[9].y * 450)
                        ),
                        (int(points[13].x * 450), 
                         int(points[13].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[13].x * 450), 
                         int(points[13].y * 450)
                        ),
                        (int(points[17].x * 450), 
                         int(points[17].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[17].x * 450), 
                         int(points[17].y * 450)
                        ),
                        (int(points[0].x * 450), 
                         int(points[0].y * 450)
                        ), (80,0,121),5)
        
        #polegar
        cv2.line(image, (int(points[1].x * 450), 
                         int(points[1].y * 450)
                        ),
                        (int(points[0].x * 450), 
                         int(points[0].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[1].x * 450), 
                         int(points[1].y * 450)
                        ),
                        (int(points[2].x * 450), 
                         int(points[2].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[2].x * 450), 
                         int(points[2].y * 450)
                        ),
                        (int(points[3].x * 450), 
                         int(points[3].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[3].x * 450), 
                         int(points[3].y * 450)
                        ),
                        (int(points[4].x * 450), 
                         int(points[4].y * 450)
                        ), (80,0,121),5)
        
        #indicador
        cv2.line(image, (int(points[5].x * 450), 
                         int(points[5].y * 450)
                        ),
                        (int(points[6].x * 450), 
                         int(points[6].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[6].x * 450), 
                         int(points[6].y * 450)
                        ),
                        (int(points[7].x * 450), 
                         int(points[7].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[7].x * 450), 
                         int(points[7].y * 450)
                        ),
                        (int(points[8].x * 450), 
                         int(points[8].y * 450)
                        ), (80,0,121),5)
        
        # dedo do meio
        cv2.line(image, (int(points[9].x * 450), 
                         int(points[9].y * 450)
                        ),
                        (int(points[10].x * 450), 
                         int(points[10].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[10].x * 450), 
                         int(points[10].y * 450)
                        ),
                        (int(points[11].x * 450), 
                         int(points[11].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[11].x * 450), 
                         int(points[11].y * 450)
                        ),
                        (int(points[12].x * 450), 
                         int(points[12].y * 450)
                        ), (80,0,121),5)
        
        # anelar
        cv2.line(image, (int(points[13].x * 450), 
                         int(points[13].y * 450)
                        ),
                        (int(points[14].x * 450), 
                         int(points[14].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[14].x * 450), 
                         int(points[14].y * 450)
                        ),
                        (int(points[15].x * 450), 
                         int(points[15].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[15].x * 450), 
                         int(points[15].y * 450)
                        ),
                        (int(points[16].x * 450), 
                         int(points[16].y * 450)
                        ), (80,0,121),5)
        
        # mindinho
        cv2.line(image, (int(points[17].x * 450), 
                         int(points[17].y * 450)
                        ),
                        (int(points[18].x * 450), 
                         int(points[18].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[18].x * 450), 
                         int(points[18].y * 450)
                        ),
                        (int(points[19].x * 450), 
                         int(points[19].y * 450)
                        ), (80,0,121),5)
        cv2.line(image, (int(points[19].x * 450), 
                         int(points[19].y * 450)
                        ),
                        (int(points[20].x * 450), 
                         int(points[20].y * 450)
                        ), (80,0,121),5)