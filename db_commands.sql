CREATE DATABASE shiftsManagement;

use shiftsManagement

CREATE TABLE comercios (
    id_comercio  INT IDENTITY(1,1) PRIMARY KEY ,
    nom_comercio NVARCHAR(255),
    aforo_maximo INT
);

CREATE TABLE servicios (
    id_servicio INT IDENTITY(1,1) PRIMARY KEY,
    id_comercio INT,
    nom_servicio NVARCHAR(255),
    hora_apertura TIME,
    hora_cierre TIME,
    duracion INT,
    FOREIGN KEY (id_comercio) REFERENCES comercios (id_comercio)
);

CREATE TABLE turnos (
    id_turno INT IDENTITY(1,1) PRIMARY KEY,
    id_servicio INT,
    fecha_turno DATE,
    hora_inicio TIME,
    hora_fin TIME,
    estado NVARCHAR(50),
    FOREIGN KEY (id_servicio) REFERENCES servicios (id_servicio)
);

# Procedimiento almacenado

DROP Procedure GenerarTurnos

-- Crear el procedimiento almacenado
CREATE PROCEDURE GenerarTurnos
    @FechaInicio DATE,
    @FechaFin DATE,
    @IdServicio INT
AS
BEGIN TRY
	PRINT('INICIO')
    -- Declarar variables para la hora de apertura, hora de cierre y duración del servicio
    DECLARE @HoraApertura TIME, @HoraCierre TIME, @Duracion INT;
    
    -- Obtener la hora de apertura y hora de cierre del servicio
    SELECT @HoraApertura = hora_apertura, @HoraCierre = hora_cierre, @Duracion = duracion
    FROM servicios
    WHERE id_servicio = @IdServicio;
    -- Declarar una variable para almacenar la hora actual
    DECLARE @HoraActual TIME;
    
    -- Inicializar la hora actual con la hora de apertura
    SET @HoraActual = @HoraApertura;
    
    -- Declarar una variable para almacenar el número de turnos generados
    DECLARE @NumeroTurnos INT;
    
    -- Generar los turnos diarios desde la fecha de inicio hasta la fecha fin
    WHILE @FechaInicio <= @FechaFin
    BEGIN
        -- Inicializar el número de turnos generados
        SET @NumeroTurnos = 0;
        
        -- Generar los turnos de la hora actual
        WHILE @HoraActual < @HoraCierre
        BEGIN
            -- Insertar un nuevo turno en la tabla de turnos
            INSERT INTO turnos (id_servicio, fecha_turno, hora_inicio, hora_fin, estado)
            VALUES (@IdServicio, @FechaInicio, @HoraActual, DATEADD(MINUTE, @Duracion, @HoraActual), 'Programado');
            
            -- Incrementar el número de turnos generados
            SET @NumeroTurnos = @NumeroTurnos + 1;
            
            -- Incrementar la hora actual en @Duracion minutos
            SET @HoraActual = DATEADD(MINUTE, @Duracion, @HoraActual);
        end;
        
        -- Incrementar la fecha y ajustar la hora actual
        SET @FechaInicio = DATEADD(DAY, 1, @FechaInicio);
    END
    
    -- Devolver los turnos generados
    SELECT * FROM turnos;
END TRY
BEGIN CATCH
    PRINT 'Error: ' + ERROR_MESSAGE();
END CATCH
-- probar turnos
EXEC GenerarTurnos
    @FechaInicio = '2023-10-15',  -- Fecha de inicio de ejemplo
    @FechaFin = '2023-10-19',     -- Fecha de fin de ejemplo
    @IdServicio = 1;              -- ID de servicio de ejemplo

