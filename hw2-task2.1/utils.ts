import { ObjectSchema } from "joi"

const errorResponse = (schemaErrors: { path: any; message: string }[]) => {
    const errors = schemaErrors.map(({path, message})=>{
      return {path, message}
    })
  
    return{
      status: 'Failed',
      errors,
    }
  }
  
  const validateSchema = (schema: ObjectSchema<any>)=>{
    return (req: { body: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { status: string; errors: any }): any; new(): any } } } , next: () => void) => {
      const {error} = schema.validate(req.body, {
        abortEarly: true,
        allowUnknown: false
      });
  
      if(error && error.isJoi) {
        return res.status(400).json(errorResponse(error.details))
      }
      next()
    }
  }

  export default validateSchema;