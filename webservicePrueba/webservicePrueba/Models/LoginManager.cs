using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/*
 * Esta clase se encarga de consultar los datos solicitados a la BD
 */
namespace webservicePrueba.Models
{
    public class LoginManager
    {
        private static string cadenaConexion =
            @"Server=192.168.56.1\SQLEXPRESS;Database=EnfermeriaTEC;User Id=sa;Password=12345";



        /// <summary>
        /// Este método busca un ID solicitado en la BD/tabla usuarios y retorna true o false en caso de que exista o no
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool comprobarUsuario(User user)
        {
            try
            {
                SqlConnection con = new SqlConnection(cadenaConexion);
                con.Open();

                string sql = @"SELECT COUNT(*) FROM users_table WHERE id_user = @id and password_user = @password";

                SqlCommand cmd = new SqlCommand(sql, con);

                cmd.Parameters.Add("@id", System.Data.SqlDbType.Int).Value = user.Id;
                cmd.Parameters.Add("@password", System.Data.SqlDbType.Int).Value = user.Password;

                int count = Convert.ToInt32(cmd.ExecuteScalar());

                if (count != 0)//Si existe el registro este returna true, que hace referencia a que si existe 
                {
                    return true;
                }
                con.Close();
                return false;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                throw new InvalidOperationException(e.Message);
            }
        }
    }
}