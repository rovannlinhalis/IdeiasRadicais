using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace IdeiasRadicais.ViewModels
{
    public class MainPageViewModel : ViewModelBase
    {
        public MainPageViewModel(INavigationService navigationService)
            : base(navigationService)
        {
            Title = "Ideias Radicais";
            _url = App.url;
        }
        private string _url;
        public string Url
        {
            get { return _url; }
            set { SetProperty(ref _url, value); }
        }

    }
}
