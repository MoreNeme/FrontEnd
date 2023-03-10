import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { ImageService } from 'src/app/service/image.service';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-editskill',
  templateUrl: './editskill.component.html',
  styleUrls: ['./editskill.component.css']
})
export class EditskillComponent implements OnInit {
skill : Skill =null;
  

  constructor(private skillS: SkillService, private activatedRouter :ActivatedRoute, private router: Router,public imageService:ImageService) { }

  ngOnInit(): void {
    const id= this.activatedRouter.snapshot.params['id'];
    this.skillS.detail(id).subscribe(
      data=>{
        this.skill=data;
      }, err=>{
        alert("error al modificar");
        this.router.navigate(['']);
      }
    )
  }
 onUpdate(){
  const id =this.activatedRouter.snapshot.params['id'];
  this.skill.imagen=this.imageService.url;
  this.skillS.update(id, this.skill).subscribe(
    data=>{
      this.router.navigate(['']);
    }, err=>{
      alert("no se pudo actualizar la skill");
      this.router.navigate(['']);
    }
  )
 }
 uploadImage($event:any){
  const id = this.activatedRouter.snapshot.params['id'];
  const name = "skill_"+id;
  this.imageService.uploadImage($event,name)
}
}
