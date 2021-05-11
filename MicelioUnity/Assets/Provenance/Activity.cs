﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class Activity
{
	public string activity_id;
    public string name;
    public string time;
    public double position_x;
    public double position_y;
    public string influenced_by;
	public Dictionary<string, object> properties;
	public List<Agent> agents;
	public List<Entity> entities;

	public Activity(string name, string time){
		
		this.activity_id = GenerateActivityID();
		this.name = name;
		this.time = time;
		agents = new List<Agent>();
		entities = new List<Entity>();

	}

	private string GenerateActivityID()
	{
		System.DateTime currentTime = System.DateTime.Now;
		return "activity-"+currentTime.Day+currentTime.Hour+currentTime.Minute+currentTime.Second+currentTime.Millisecond;		
	}

	public void SetPosition(double x, double y)
	{
		this.position_x = x;
		this.position_y = y;
	}

	public void SetInfluence(string activity_id)
	{
		this.influenced_by = activity_id;
	}  

	public void AddProperty(string key,object value)
	{	
		this.properties.Add(key,value);
	} 

	public void AddEntity(EntityObject e)
	{
		this.entities.Add(e.GetEntity());
	}

	public void AddAgent(AgentObject a)
	{
		this.agents.Add(a.GetAgent());	
	}

}
