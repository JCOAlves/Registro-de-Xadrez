import datetime

def returnDATAeHORA(formato):
    DATAeHORA = datetime.datetime.now()

    horario = ""
    if formato == "data":
        horario = DATAeHORA.strftime("%d/%m/%Y")
    elif formato == "hora":
        horario = DATAeHORA.strftime("%H:%M:%S")
        
    return horario