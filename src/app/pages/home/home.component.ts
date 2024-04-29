import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  contacts = [
    {
      name: "Dani Arthur Widodo",
      tel: "+62 813 417 147",
      email: "work.daniarthurwidodo@gmail.com",
    },
  ];
  projects = [];
  skills = [
    { programmingLanguage: ["dotnet", "javascript", "PHP"] },
    { frameworks: ["angular", "wordpress"] },
    { database: ["mongodb", "postgresql"] },
  ];
  aboutMe = [""];
  certificates = [{ name: "", link: "" }];
  education = [{ name: "", year: "" }];
  tutorials = [{ name: "", link: "", image: "" }];
  jobTitle = "";
  experience = [{ name: "", year: "", jobDescription: "" }];
}
