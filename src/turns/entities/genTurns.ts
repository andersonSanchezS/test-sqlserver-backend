// stored-procedure-result.entity.ts
import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class GenTurns {
  // Define las columnas correspondientes a los resultados del procedimiento almacenado
  @PrimaryColumn()
  id_turno: number;
  id_servicio: number;
  fecha_turno: Date;
  hora_inicio: Date;
  hora_fin: Date;
  estado: string;
}
