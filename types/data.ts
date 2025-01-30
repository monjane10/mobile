
interface refeicoesProps{
    horario: string,
    nome: string,
    alimentos: string[],

}
export interface Data{
    nome: string,
    sexo: string,
    idade: number,
    altura: number,
    objetivo: string,
    peso: number,
    refeicoes: refeicoesProps[] ,
    suplementos: string[],
}