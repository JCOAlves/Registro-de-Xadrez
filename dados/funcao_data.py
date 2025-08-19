import datetime

def returnDATAeHORA():
    DATAeHORA = datetime.datetime.now()
    horario = DATAeHORA.strftime("%d/%m/%Y - %H:%M:%S")
    return horario