
const Form = () => {
  return (
    <form action="/new" method="POST" className="form_resul">
      <label htmlFor="liga">Liga</label>
      <input type="text" name="liga" placeholder="" />

      <label htmlFor="categoria">Categoria</label>
      <input type="text" name="categoria" placeholder="" />

      <label htmlFor="torneo">Torneo</label>
      <input type="text" name="torneo" placeholder="" />

      <button type="submit">Enviar</button>
    </form>
  );
};

const FornewTorneo = () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default FornewTorneo;