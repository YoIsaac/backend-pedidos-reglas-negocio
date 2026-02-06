const pedidosRepository = require('../repositories/pedidos.repository')

class PedidosController {

  getAll(req, res) {
    res.json(pedidosRepository.getAll())
  }

  getById(req, res) {
    const id = Number(req.params.id)
    const pedido = pedidosRepository.getById(id)

    if (!pedido) {
      return res.status(404).json({ mensaje: 'pedido no encontrado' })
    }

    res.json(pedido)
  }

  create(req, res) {
    const { producto, cantidad } = req.body

    if (!producto || cantidad <= 0) {
      return res.status(400).json({ mensaje: 'datos invalidos' })
    }

    const pedido = {
      producto,
      cantidad,
      estado: 'pendiente'
    }

    const nuevoPedido = pedidosRepository.create(pedido)
    res.status(201).json(nuevoPedido)
  }

  update(req, res) {
    const id = Number(req.params.id)
    const pedido = pedidosRepository.getById(id)

    if (!pedido) {
      return res.status(404).json({ mensaje: 'pedido no encontrado' })
    }

    if (pedido.estado !== 'pendiente') {
      return res.status(400).json({ mensaje: 'pedido no modificable' })
    }

    const { estado } = req.body
    const estadosValidos = ['confirmado', 'cancelado']

    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ mensaje: 'estado invalido' })
    }

    const actualizado = pedidosRepository.update(id, { estado })
    res.json(actualizado)
  }

  delete(req, res) {
    const id = Number(req.params.id)
    const pedido = pedidosRepository.getById(id)

    if (!pedido) {
      return res.status(404).json({ mensaje: 'pedido no encontrado' })
    }

    if (pedido.estado !== 'pendiente') {
      return res.status(400).json({ mensaje: 'solo pedidos pendientes se eliminan' })
    }

    pedidosRepository.delete(id)
    res.json({ mensaje: 'pedido eliminado' })
  }
}

module.exports = new PedidosController()
