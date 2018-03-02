using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webservicePrueba.Models
{
    /// <summary>
    /// Clase que sirve para poder insertar u obtener registros desde la BD
    /// </summary>
    public class User
    {
        public int Id { get; set; }
        public int Password { get; set; }

    }

}