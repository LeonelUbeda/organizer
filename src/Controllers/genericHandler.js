import { factoryModelNuevo, factoryModelTodos, factoryModelActualizarId, factoryModelEliminarCondicionAnd, factoryModelID, factoryModelActualizarPorCampo, factoryModelNuevoInclude } from './generics'


const genericHandler = ({model, action, include = []}) => {
    const HTTP = {
        // Retorna los registros que coinciden con las variables del req.query
        // 
        leer: async (req, res) => {
            const consulta = req.query;
            const modelLeer = factoryModelTodos({model, include})
            try {
                const resultado = await modelLeer(consulta)
                res.status(200).json(resultado)
            } catch (error) {
                res.status(400).json({mensaje: 'Error'})
            }
        },
        leerId: async (req, res) => {
            const {id} = req.params
            const modelTodosId = factoryModelID({model, include})
            try {
                const resultado = await modelTodosId(parseInt(id))
                res.status(200).json(resultado)
            } catch (error) {
                res.status(400).json({mensaje: 'Error'})
                
            }
        },
        // Retorna los registros que coinciden con los parametros en req.params
        // Ademas hace la busqueda por req.query
        leerParametros: async (req, res) => {
            const consulta = req.query;
            const parametros = req.params;
            const modelLeer = factoryModelTodos({model, include})
            try {
                const resultado = await modelLeer({ ...consulta, ...parametros })
                res.status(200).json(resultado)
            } catch (error) {
                res.status(400).json({mensaje: 'Error'})
            }
        },
        crear: async (req, res) => {
            const elemento = req.body
            const query = req.params
            const modelCrear = factoryModelNuevo({model})
            try {
                const resultado = await modelCrear({...elemento, ...query})
                res.status(201).json(resultado) 
            } catch (error) {
                res.status(400).json({mensaje: 'Error'})
            }
        },
        crearInclude : async (req, res ) => {
            const elemento = req.body
            const query = req.params
            const modelCrear = factoryModelNuevoInclude({model, include})
            try {
                const resultado = await modelCrear({...elemento, ...query})
                res.status(201).json(resultado)
            } catch (error) {
                res.status(400).json({mensaje: 'Error include'})
            }
        },
        actualizarPorId: async (req, res) => {
            const identificador = req.params
            const elemento = req.body;
            const modelActualizar = factoryModelActualizarId({model})
            try {
                const resultado = await modelActualizar({...identificador, ...elemento})
                res.status(201).json(resultado)
            } catch (error) {
                res.status(400).json({mensaje: 'Error'})
            }
        },

        // Actualiza todos los registros que coinciden con los parametros en req.params
        // La variable tiene que ser la misma que en la tabla. Ejemplo. Tabla telefono: clienteId, telefono
        // /api/cliente/:clienteId/telefono/:telefono da como resultado where: {clienteId: clienteId, telefono: telefono}
        // de otra forma el where será invalido
        actualizarPorParametros: async (req, res) => {
            const identificador = req.params
            const camposActualizar = req.body;
            const modelActualizar = factoryModelActualizarPorCampo({model})
            try {
                const resultado = await modelActualizar(camposActualizar ,identificador)
                res.status(201).json(resultado)
            } catch (error) {
                res.status(400).json({mensaje: 'Error'})

            }
        },
        eliminarPorId: async (req, res) => {
            const {id} = req.params
            const modelEliminar = factoryModelEliminarCondicionAnd({model})
            try {
                const resultado = await modelEliminar({id})
                res.status(200).json(resultado)
            } catch (error) {
                res.status(400).json({mensaje: 'Error'})
                
            }
        },
        // Elimina por condiciones que estan en los parametros
        eliminarPorCondicion: async (req, res) => {
            const condiciones = req.params
            const modelEliminar = factoryModelEliminarCondicionAnd({model})
            try {
                const resultado = await modelEliminar(condiciones)
                res.status(200).json(resultado)
            } catch (error) {
                res.status(400).json({mensaje: 'Error'})
            }
        }
        
        
    }
    
    return HTTP[action]
    
}

genericHandler.READ =                'leer'
genericHandler.READ_BY_ID =         'leerId'
genericHandler.CREATE =               'crear'
genericHandler.CREATE_INCLUDE =       'crearInclude'
genericHandler.DELETE_BY_ID =     'eliminarPorId'
genericHandler.UPDATE_BY_PARAMS = 'actualizarPorParametros'
genericHandler.UPDATE_BY_ID =   'actualizarPorId'
genericHandler.READ_BY_PARAMS =     'leerParametros'
genericHandler.DELETE_BY_PARAMS = 'eliminarPorCondicion'
export default genericHandler
