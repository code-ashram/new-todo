const Form = () => {

  return (
    <div className="input-group mb-3">
      <input type="text" className="form-control" placeholder="Add new task" aria-label="Recipient's username"
             aria-describedby="button-addon2" />
      <button className="btn btn-primary" type="button" id="button-addon2">Add</button>
    </div>
  )
}

export default Form
