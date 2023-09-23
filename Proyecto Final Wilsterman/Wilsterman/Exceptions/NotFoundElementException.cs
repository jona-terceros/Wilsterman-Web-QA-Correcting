using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wilsterman.Exceptions
{
    public class NotFoundElementException:Exception
    {
        public NotFoundElementException(string message) : base(message)
        {
        }
    }
}
