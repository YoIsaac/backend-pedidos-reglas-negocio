class PedidosRepository {
  constructor() {
    this.pedidos = []
    this.id = 1
  }

  getAll() {
    return this.pedidos
  }

  getById(id) {
    return this.pedidos.find(p => p.id === id)
  }

  create(pedido) {
    pedido.id = this.id
    this.id++
    this.pedidos.push(pedido)
    return pedido
  }

  update(id, data) {
    const pedido = this.getById(id)
    if (!pedido) return null

    Object.assign(pedido, data)
    return pedido
  }

  delete(id) {
    const index = this.pedidos.findIndex(p => p.id === id)
    if (index === -1) return null

    return this.pedidos.splice(index, 1)[0]
  }
}

module.exports = new PedidosRepository()
