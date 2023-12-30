import numpy as np

class Pose:
  def __init__(self, x, y, z):
    self.x = x
    self.y = y
    self.z = z

class Hand:
  def __init__(self, x, y, z):
    self.x = x
    self.y = y
    self.z = z

def npy_to_keypoints(npyArray) :
    keypointsArray = np.ndarray.tolist(npyArray)
    pose_keypointsArray = keypointsArray[:99]
    leftHand_keypointsArray = keypointsArray[:162][-63:]
    rightHand_keypointsArray = keypointsArray[:225][-63:]

    #^ PREENCHENDO ARRAY COM OS PONTOS DO CORPO
    pose_kp_formatted = []
    coordinate_id = 0
    x = 0
    y = 0
    z = 0

    for points in pose_keypointsArray :
        if(coordinate_id == 0):
            x = points
        if(coordinate_id == 1):
            y = points
        if(coordinate_id == 2):
            z = points

            pose_kp_formatted.append(
                Pose(x, y, z)
            )

            x = 0
            y = 0
            z = 0
            coordinate_id = 0
        else:
            coordinate_id = coordinate_id + 1
    
    #^ PREENCHENDO ARRAY COM OS PONTOS DA MÃO ESQUERDA
    leftHand_kp_formatted = []
    coordinate_id = 0
    x = 0
    y = 0
    z = 0
    visibility = 0

    for points in leftHand_keypointsArray :
        if(coordinate_id == 0):
            x = points
        if(coordinate_id == 1):
            y = points
        if(coordinate_id == 2):
            z = points

            leftHand_kp_formatted.append(
                Hand(x, y, z)
            )

            x = 0
            y = 0
            z = 0
            coordinate_id = 0
        else:
            coordinate_id = coordinate_id + 1

    #^ PREENCHENDO ARRAY COM OS PONTOS DA MÃO DIREITA
    rightHand_kp_formatted = []
    coordinate_id = 0
    x = 0
    y = 0
    z = 0

    for points in rightHand_keypointsArray :
        if(coordinate_id == 0):
            x = points
        if(coordinate_id == 1):
            y = points
        if(coordinate_id == 2):
            z = points

            rightHand_kp_formatted.append(
                Hand(x, y, z)
            )

            x = 0
            y = 0
            z = 0
            coordinate_id = 0
        else:
            coordinate_id = coordinate_id + 1

    return (pose_kp_formatted,rightHand_kp_formatted,leftHand_kp_formatted)