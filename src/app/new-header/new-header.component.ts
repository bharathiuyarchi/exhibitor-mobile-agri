import { Component } from "@angular/core";

@Component({
  selector: "new-header",
  templateUrl: "./new-header.component.html",
  styleUrls: ["./new-header.component.css"],
})
export class NewHeaderComponent {
  agri: any = [
    {
      title: "Agri-food Supply chain Disruption",
      link: "https://agriexpo.live/agri-food-supply-chain-disruption/",
    },
    {
      title: "India @ 2030",
      link: "https://agriexpo.live/india-2030/",
    },
    {
      title: "India’s Agriculture @ 2030",
      link: "https://agriexpo.live/indias-agriculture-2030/",
    },
    {
      title: "Traceability",
      link: "https://agriexpo.live/traceability/",
    },
    {
      title: "Climate Change trends",
      link: "https://agriexpo.live/climate-change-trends/",
    },
  ];

  expo: any = [
    {
      title: "Why this expo?",
      link: "https://agriexpo.live/#agriexpolive2023",
    },
    {
      title: "Importance of digital expo",
      link: "https://agriexpo.live/#agriexpolive2023",
    },
    {
      title: "Agriexpo live 2023 VS Other Expos",
      link: "https://agriexpo.live/agriexpolive-2023-vs-other-expos/",
    },
    {
      title: "Highlights",
      link: "https://agriexpo.live/#agriexpolive2023",
    },
  ];
  exhi: any = [
    {
      title: "Exhibitor profile",
      link: "https://agriexpo.live/wp-exhibitor/",
    },
    {
      title: "Register",
      link: "https://exhibitor.agriexpo.live/login",
    },
    {
      title: "Pricing",
      link: "https://agriexpo.live/pricing/",
    },
    {
      title: "Brochure",
      link: "https://agriexpo.live/brochure/",
    },
    {
      title: "Marketing Campaign",
      link: "https://agriexpo.live/marketing-campagin/",
    },
    {
      title: "Terms and Conditions",
      link: "https://agriexpo.live/terms-and-conditions/",
    },
  ];
  spon: any = [
    {
      title: "Sponsorship benefits",
      link: "https://agriexpo.live/sponsorship-benefits/",
    },
    {
      title: "Sponsor Register",
      link: "https://sponsor.agriexpo.live/",
    },
  ];
  visi: any = [
    {
      title: "Visitor profile",
      link: "https://agriexpo.live/wp-visitor/",
    },
    {
      title: "Register",
      link: "https://visitor.agriexpo.live/login",
    },
  ];
}
