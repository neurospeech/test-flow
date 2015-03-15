using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace TestFlow
{
    class Program
    {
        static void Main(string[] args)
        {

            var dir = (new FileInfo(typeof(Program).Assembly.Location)).Directory;

            string exe = dir.FullName + "\\phantomjs.exe";
            string exeArgs =
                "--disk-cache=true " +
                "--cookies-file=" + dir.FullName + "\\cookies.txt " +
                dir.Parent.Parent.Parent.FullName + "\\test-flow-phantom.js " + 
                dir.Parent.Parent.FullName + "\\AtomsWebsiteCheck.testflow.json";


            ProcessHelper.Execute(exe, exeArgs,
                o => Console.WriteLine(o), 
                e => Console.Error.WriteLine(e));


            Console.ReadLine();
            

        }
    }
}
