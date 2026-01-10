import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('urls')
export class Url {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', name: 'original_url' })
    originalUrl: string;

    @Column({ unique: true, length: 10, name: 'code' })
    @Index() // Indexing the code column for faster lookups
    code: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
