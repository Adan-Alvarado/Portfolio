import type { Project } from '../../types/portfolio';

interface ProjectPreviewProps {
	project: Project;
	expanded?: boolean;
}

export default function ProjectPreview({ project, expanded = false }: ProjectPreviewProps) {
	if (project.preview === 'auto-care') {
		return (
			<div className={`pg-preview pg-preview--auto${expanded ? ' is-expanded' : ''}`} aria-hidden="true">
				<span className="pg-demo-label">Concepto demo</span>
				<div className="pg-auto-window">
					<div className="pg-window-bar"><i></i><i></i><i></i><span>autocare.local</span></div>
					<div className="pg-auto-nav"><b>AUTO CARE</b><span>Resumen&nbsp;&nbsp; Servicios&nbsp;&nbsp; Historial</span></div>
					<div className="pg-auto-layout">
						<div className="pg-auto-copy">
							<small>PRÓXIMO SERVICIO · 18 DÍAS</small>
							<strong>Tu auto,<br />siempre al día.</strong>
							<span>Ver mantenimiento</span>
						</div>
						<div className="pg-car-shape"><i></i><i></i></div>
					</div>
					<div className="pg-auto-stats"><span><b>04</b> Servicios</span><span><b>82%</b> Estado general</span><span><b>12k</b> Kilómetros</span></div>
				</div>
			</div>
		);
	}

	if (project.preview === 'diseno') {
		return (
			<div className={`pg-preview pg-preview--design${expanded ? ' is-expanded' : ''}`} aria-hidden="true">
				<span className="pg-demo-label">Muestra conceptual</span>
				<div className="pg-poster pg-poster--one"><small>IDENTIDAD / 01</small><b>CASA<br />NÓMADA</b><i></i></div>
				<div className="pg-poster pg-poster--two"><small>CAMPAÑA / 02</small><b>FRUTA<br />24</b><span>FRESCO · LOCAL · DIARIO</span></div>
				<div className="pg-poster pg-poster--three"><small>EDITORIAL / 03</small><b>RITMO</b><i></i><span>VOL. 08</span></div>
			</div>
		);
	}

	return (
		<div className={`pg-preview pg-preview--fixit${expanded ? ' is-expanded' : ''}`} aria-hidden="true">
			<span className="pg-demo-label">API ficticia</span>
			<div className="pg-api-window">
				<div className="pg-api-sidebar"><b>FIXIT / API</b><span>Overview</span><span className="is-active">Tickets</span><span>Assignments</span><span>Users</span></div>
				<div className="pg-api-main">
					<small>ENDPOINT DE EJEMPLO</small>
					<strong><i>POST</i> /v1/tickets</strong>
					<pre>{`{\n  "status": "open",\n  "priority": "medium"\n}`}</pre>
					<span><i>201</i> Ticket created</span>
				</div>
			</div>
		</div>
	);
}

