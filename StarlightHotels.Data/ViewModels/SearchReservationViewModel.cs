﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.Models.ViewModels
{
    public class SearchReservationViewModel
    {
        public int ClientId { get; set; }

        public string City { get; set; }

        public DateTimeOffset? ArrivalDate { get; set; }

        public DateTimeOffset? DepartureDate { get; set; }
    }
}