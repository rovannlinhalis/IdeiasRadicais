using Prism;
using Prism.Ioc;
using IdeiasRadicais.ViewModels;
using IdeiasRadicais.Views;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using Microsoft.AppCenter;
using Microsoft.AppCenter.Analytics;
using Microsoft.AppCenter.Crashes;
using Microsoft.AppCenter.Push;

[assembly: XamlCompilation(XamlCompilationOptions.Compile)]
namespace IdeiasRadicais
{
    public partial class App
    {
        public static string url = "https://ideiasradicais.com.br/artigos/";
        /* 
         * The Xamarin Forms XAML Previewer in Visual Studio uses System.Activator.CreateInstance.
         * This imposes a limitation in which the App class must have a default constructor. 
         * App(IPlatformInitializer initializer = null) cannot be handled by the Activator.
         */
        public App() : this(null) { }

        public App(IPlatformInitializer initializer) : base(initializer) { }

        protected override async void OnInitialized()
        {
            InitializeComponent();

            await NavigationService.NavigateAsync("NavigationPage/MainPage");
        }

        protected override void OnStart()
        {
            base.OnStart();
            if (!AppCenter.Configured)
            {
                
                Push.PushNotificationReceived += (sender, e) =>
                {
                    // Add the notification message and title to the message
                    var summary = $"Push notification received:" +
                                        $"\n\tNotification title: {e.Title}" +
                                        $"\n\tMessage: {e.Message}";

                    // If there is custom data associated with the notification,
                    // print the entries
                    if (e.CustomData != null)
                    {
                        if (!e.CustomData.TryGetValue("url", out url))
                        {
                            url = "https://ideiasradicais.com.br/artigos/";
                        }
                        summary += "\n\tCustom data:\n";
                        foreach (var key in e.CustomData.Keys)
                        {
                            summary += $"\t\t{key} : {e.CustomData[key]}\n";
                        }
                    }

                    // Send the notification summary to debug output
                    System.Diagnostics.Debug.WriteLine(summary);
                };

                
            }
            AppCenter.Start("android=db75218b-5ca4-4406-b32d-506d12411b2e;", typeof(Analytics), typeof(Crashes), typeof(Push));
        }

        protected override void RegisterTypes(IContainerRegistry containerRegistry)
        {
            containerRegistry.RegisterForNavigation<NavigationPage>();
            containerRegistry.RegisterForNavigation<MainPage, MainPageViewModel>();
        }
    }
}
