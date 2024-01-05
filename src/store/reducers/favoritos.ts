import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../../App'

type FavoritosState = {
  itens: Produto[]
  length: number
}

const initialState: FavoritosState = {
  itens: [],
  length: 0
}

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    favoritar: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload // action.payload é o valor que será recebido a partir da action

      // Verifica se produto clicado já está favoritado
      if (state.itens.find((p) => p.id === produto.id)) {
        --state.length

        // Retira o produto dos favoritos
        const favoritosSemProduto = state.itens.filter(
          (p) => p.id !== produto.id
        )
        state.itens = favoritosSemProduto
      } else {
        ++state.length
        // state.itens.push(produto)
        state.itens.push({ ...produto, estaNosFavoritos: true })
      }

      state.length = state.itens.length
    }
  }
})

export const { favoritar } = favoritosSlice.actions
export default favoritosSlice.reducer
