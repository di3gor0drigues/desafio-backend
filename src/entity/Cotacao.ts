import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm'

@Entity()
export class Cotacao {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    timestamp: Date

    @Column()
    data: Date

    @Column()
    cotacaoCompra: number

    @Column()
    cotacaoVenda: number

    @Column()
    cotacaoData: Date
}
