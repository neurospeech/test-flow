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
                dir.Parent.FullName + "\\test-flow-phantom.js " + 
                dir.Parent.FullName + "\\TestFlow\\AtomsWebsiteCheck.testflow.json 3245";


            ProcessHelper.Execute(exe, exeArgs,
                o => {
                    LoadBrowser();
                    Console.WriteLine(o); 
                },
                e => Console.Error.WriteLine(e));


            Console.ReadLine();
            

        }


        static bool browserLoaded = false;
        private static void LoadBrowser()
        {
            if (browserLoaded)
                return;
            Process.Start("http://localhost:3245/result.html");
            browserLoaded = true;
        }
    }
}
