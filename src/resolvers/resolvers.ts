
import axios from 'axios';
import * as moment from 'moment';
import { Cotacao } from '../entity/Cotacao';
import { GraphQLScalarType } from 'graphql';
import { getRepository } from 'typeorm';

interface CotacaoDolar {
  cotacaoCompra: number,
  cotacaoVenda: number,
  dataHoraCotacao: string,
}

interface CotacaoDolarDiaResponse {
  '@odata.context': string,
  value: CotacaoDolar[]
}

export const resolver = {
  Query: {
    cotacoes: () => getRepository(Cotacao).find()
  },

  Mutation: {
    criarCotacao: async (_: any, args: { data: string; } ) => {
      const data = moment(args.data, 'DD/MM/YYYY');
      const dataCotacao = data.format('DD-MM-YYYY');

      const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${dataCotacao}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;
      const res = await axios.get(url);
      const json: CotacaoDolarDiaResponse = res.data;

      if (json.value.length > 0) {
        const value = json.value[0];

        const cotacao: Cotacao = {
          id: null,
          timestamp: new Date(),
          data: data.toDate(),
          cotacaoCompra: value.cotacaoCompra,
          cotacaoVenda: value.cotacaoVenda,
          cotacaoData: moment(value.dataHoraCotacao).toDate()
        }
  
        const repos = getRepository(Cotacao)
        const persisted = await repos.save(cotacao);
  
        return persisted
      } else {
        throw 'cotação não encontrada';
      }
    }
  },

  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
      console.log('parseValue', value)
      return moment(value).toDate();
    },
    serialize(value) {
      console.log('serialize', value)
      return moment(value).toISOString();
    },
  })
}
