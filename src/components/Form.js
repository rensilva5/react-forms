import { useState, useEffect } from "react";

export default function Form({ronsProps, aliciaProps, handleClose, setStateFromChild}){
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [validForm, setValidForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [form, setForm] = useState({})

    console.log("props here", ronsProps, aliciaProps)
  
    useEffect(() => {
      if (form?.title?.length > 3 && form?.description?.length > 10) {
        setValidForm(true);
      } else {
        setValidForm(false);
      }
    }, [form]);
  
    async function formSubmit(e) {
      e.preventDefault(); // stops the page refresh
      if (!validForm) {
        setErrorMessage("Not a valid form");
        return;
      }
      try {
        const results = await fetch("https://sql.bocacode.com/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        console.log(results)
        const data = await results.json();
        console.log(data);

        setFormSubmitted(true);
        setErrorMessage("");
        setValidForm(true);

        handleClose()
        setStateFromChild(form)
      } catch (error) {
        console.error(error);
        setErrorMessage("there was an error submitted your comment " + error.toString());
      }
    }
    console.log('this is form =>', form)

    const updateForm = event => {
     setForm({...form, [event.target.name]: event.target.value})
    };
  
    return (
      <div className="App">
        <h3>
          {ronsProps} {aliciaProps[0]}
        </h3>
        <form onSubmit={formSubmit}>
  
          <label>Title: </label>
          <input
            type="text"
            name="title"
            // required
            value={form.title}
            onChange={updateForm}
          />
          <h3>{form.title}</h3>
          
          <label>Description:</label>
          <textarea
            value={form.description}
            name='description'
            //required
            onChange= {updateForm}
            />
  
          <h3>{form.description}</h3>
  
          <label>Author</label>
          <select value={form.author} name='author'onChange={updateForm}>
            <option value="" selected>
              Choose One
            </option>
            <option value="todd albert">Dortor Todd</option>
            <option value="ludwigson">Ludwigson</option>
            <option value="other">Other</option>
          </select>
          <h3>{form.author}</h3>
          <button onClick={() => setStateFromChild('hello Father')}>
            Send stuff back to parent</button>
        {!formSubmitted && <button>Submit form</button>}
          {errorMessage && (
            <h1>
              There was an error:
              <br />
              {errorMessage}
            </h1>
          )}
        </form>
      </div>
    )
  }